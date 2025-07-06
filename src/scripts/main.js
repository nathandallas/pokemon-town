import "../assets/town-styles.css";

const componentCache = new Map();

async function loadComponent(componentName, targetId) {
  // Return cached component
  if (componentCache.has(componentName)) {
    document.getElementById(targetId).innerHTML =
      componentCache.get(componentName);
    return;
  }

  try {
    const response = await fetch(`components/${componentName}.html`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const html = await response.text();

    // Cache the component
    componentCache.set(componentName, html);

    document.getElementById(targetId).innerHTML = html;
  } catch (error) {
    console.error(`Component load error for ${componentName}:`, error);
    document.getElementById(
      targetId
    ).innerHTML = `<div class="component-error">Error loading ${componentName}</div>`;
  }
}

// Load all components when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  loadComponent("nav", "nav-placeholder");
  loadComponent("footer", "footer-placeholder");
});
