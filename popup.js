// Popup script - handles UI and skill extraction

// Cross-browser compatibility
const browserAPI = typeof browser !== 'undefined' ? browser : chrome;

let extractedSkills = [];

// Initialize when popup opens
document.addEventListener('DOMContentLoaded', async () => {
  await checkCurrentPage();

  document.getElementById('importBtn').addEventListener('click', handleImport);
  document.getElementById('downloadBtn').addEventListener('click', downloadSkills);
});

async function checkCurrentPage() {
  try {
    const [tab] = await browserAPI.tabs.query({ active: true, currentWindow: true });

    if (tab.url.includes('linkedin.com/in/') && tab.url.includes('/details/skills')) {
      updateStatus('Ready to import skills from this page', 'info');
      document.getElementById('importBtn').disabled = false;
    } else if (tab.url.includes('linkedin.com/in/')) {
      updateStatus('Navigate to the Skills section of this profile', 'warning');
      document.getElementById('importBtn').disabled = true;
    } else {
      updateStatus('Please navigate to a LinkedIn profile\'s skills page', 'warning');
      document.getElementById('importBtn').disabled = true;
    }
  } catch (error) {
    console.error('Error checking page:', error);
    updateStatus('Unable to check current page', 'error');
  }
}

async function ensureContentScriptLoaded(tabId) {
  try {
    // Try to ping the content script
    await browserAPI.tabs.sendMessage(tabId, { action: 'ping' });
    return true;
  } catch (error) {
    // Content script not loaded, inject it manually
    console.log('Content script not found, injecting...');
    try {
      await browserAPI.scripting.executeScript({
        target: { tabId: tabId },
        files: ['content.js']
      });
      // Wait a bit for the script to initialize
      await new Promise(resolve => setTimeout(resolve, 100));
      return true;
    } catch (injectError) {
      console.error('Failed to inject content script:', injectError);
      return false;
    }
  }
}

async function handleImport() {
  const [tab] = await browserAPI.tabs.query({ active: true, currentWindow: true });

  // Check if we're on a LinkedIn skills page
  if (!tab.url.includes('linkedin.com/in/') || !tab.url.includes('/details/skills')) {
    updateStatus('Please navigate to a LinkedIn profile\'s skills page', 'error');
    return;
  }
  
  updateStatus('Extracting skills from page...', 'info');
  document.getElementById('importBtn').disabled = true;
  
  try {
    // Ensure content script is loaded
    const scriptLoaded = await ensureContentScriptLoaded(tab.id);
    if (!scriptLoaded) {
      throw new Error('Unable to load content script. Please refresh the LinkedIn page and try again.');
    }

    // Send message to content script to extract skills
    const response = await browserAPI.tabs.sendMessage(tab.id, { action: 'extractSkills' });

    if (!response.success) {
      throw new Error(response.error || 'Failed to extract skills');
    }
    
    extractedSkills = response.skills;

    if (extractedSkills.length === 0) {
      updateStatus('No skills found on this page. Try scrolling down to load all skills.', 'warning');
      document.getElementById('importBtn').disabled = false;
      return;
    }
    
    // Show preview
    displaySkillsPreview(extractedSkills);

    // Copy to clipboard
    const skillsText = extractedSkills.join('\n');
    await copyToClipboard(skillsText);

    updateStatus(
      `✅ Successfully extracted ${extractedSkills.length} skills and copied to clipboard!`,
      'success'
    );
    
    // Show download button
    document.getElementById('downloadBtn').style.display = 'block';

    // Re-enable button after a short delay
    setTimeout(() => {
      document.getElementById('importBtn').disabled = false;
    }, 1000);

  } catch (error) {
    console.error('Import error:', error);
    updateStatus(`Error: ${error.message}`, 'error');
    document.getElementById('importBtn').disabled = false;
  }
}

async function copyToClipboard(text) {
  try {
    // Try modern clipboard API first
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text);
    } else {
      // Fallback for older browsers
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    }
  } catch (error) {
    console.error('Failed to copy to clipboard:', error);
    throw new Error('Failed to copy to clipboard');
  }
}

function downloadSkills() {
  const data = {
    skills: extractedSkills,
    extractedAt: new Date().toISOString(),
    source: 'LinkedIn Skills Importer Extension'
  };

  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `linkedin-skills-${Date.now()}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);

  updateStatus('Skills downloaded as JSON file!', 'success');
}

function displaySkillsPreview(skills) {
  const preview = document.getElementById('skillsPreview');
  preview.style.display = 'block';
  
  const skillsList = skills.slice(0, 10).map(skill => `<li>${escapeHtml(skill)}</li>`).join('');
  const remaining = skills.length > 10 ? `<li><em>...and ${skills.length - 10} more</em></li>` : '';
  
  preview.innerHTML = `
    <strong>Extracted Skills (${skills.length}):</strong>
    <ul>
      ${skillsList}
      ${remaining}
    </ul>
  `;
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function updateStatus(message, type) {
  const statusEl = document.getElementById('status');
  statusEl.textContent = message;
  statusEl.className = `status ${type}`;
}
