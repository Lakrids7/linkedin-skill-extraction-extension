// Content script that runs on LinkedIn skills pages
// This extracts skills from the page DOM

// Cross-browser compatibility
const browserAPI = typeof browser !== 'undefined' ? browser : chrome;

function extractSkillsFromPage() {
  const skills = [];
  
  // LinkedIn uses these selectors for skill items
  const skillElements = document.querySelectorAll('[id*="profilePagedListComponent"]');
  
  console.log(`Found ${skillElements.length} skill elements`);
  
  skillElements.forEach((element, index) => {
    try {
      // Strategy 1: Look for aria-hidden spans (most reliable)
      const skillSpans = element.querySelectorAll('span[aria-hidden="true"]');
      
      for (const span of skillSpans) {
        const text = span.textContent.trim();
        
        // Valid skill name: 1-100 characters, not a number, not endorsement text
        if (text && 
            text.length >= 1 && 
            text.length <= 100 && 
            !text.match(/^\d+$/) && 
            !text.startsWith('(') && 
            !text.toLowerCase().includes('endorsement')) {
          
          if (!skills.includes(text)) {
            skills.push(text);
            console.log(`Extracted skill: ${text}`);
          }
          break; // Found the skill name, move to next element
        }
      }
    } catch (error) {
      console.error(`Error extracting skill from element ${index}:`, error);
    }
  });
  
  console.log(`Total skills extracted: ${skills.length}`);
  return skills;
}

// Listen for messages from popup
browserAPI.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'ping') {
    // Health check - respond immediately
    sendResponse({ success: true, ready: true });
    return true;
  }

  if (request.action === 'extractSkills') {
    try {
      const skills = extractSkillsFromPage();
      sendResponse({ success: true, skills });
    } catch (error) {
      sendResponse({ success: false, error: error.message });
    }
    return true;
  }

  return true; // Keep channel open for async response
});

// Notify that content script is ready
console.log('LinkedIn Skills Importer: Content script loaded and ready');
