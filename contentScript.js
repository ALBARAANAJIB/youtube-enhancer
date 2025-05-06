// Injected YouTube-style button styles
const style = document.createElement('style');
style.textContent = `
  #unlike-all-btn {
    display: inline-flex !important;
    align-items: center !important;
    justify-content: center !important;
    font-family: 'Roboto', sans-serif !important;
    font-size: 14px !important;
    font-weight: 500 !important;
    padding: 6px 12px !important;
    background-color: #ffffff !important;
    color: #000000 !important;
    border: 1px solid #e0e0e0 !important;
    border-radius: 4px !important;
    box-shadow: 0 1px 2px rgba(0,0,0,0.1) !important;
    cursor: pointer !important;
    transition: background-color 0.2s ease !important;
  }
  #unlike-all-btn:hover {
    background-color: #f2f2f2 !important;
  }
  
  #unlike-all-btn:active {
    background-color: #e6e6e6 !important;
  }
  
  #unlike-all-btn svg {
    width: 16px !important;
    height: 16px !important;
    margin-right: 8px !important;
    fill: currentColor;
  }
`;

document.head.appendChild(style);
  







function createUnlikeButton() {
    const btn = document.createElement('button');
    btn.innerText = '🧹 Unlike All';
    btn.id = 'unlike-all-btn';
    Object.assign(btn.style, {
        position: 'fixed',
        bottom: '100px',
        left: '20px',
        zIndex: '9999',
        padding: '10px 14px',
        background: '#282828',
        color: '#fff',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
        boxShadow: '0 0 5px rgba(0,0,0,0.4)',
        fontSize: '14px',
        // Added styles to allow absolute positioning of children
       
    });
    // Append the button to the DOM immediately after creating it
    document.body.appendChild(btn);
  
    // Create the parent container for the touch feedback shapes
    const feedbackContainer = document.createElement('div');
    feedbackContainer.classList.add('yt-spec-touch-feedback-shape', 'yt-spec-touch-feedback-shape--overlay-touch-response');
    Object.assign(feedbackContainer.style, {
      display: 'block',
      position: 'absolute',
      top: '0px',
      left: '0px',
      width: '100%',
      height: '100%',
      pointerEvents:'none',
    });
  
    // Create the stroke element
    const stroke = document.createElement('div');
    stroke.classList.add('yt-spec-touch-feedback-shape__stroke');
      Object.assign(stroke.style, {
        display: 'block',
        position: 'absolute',
        top: '0px',
        left: '0px',
        width: '100%',
        height: '100%',
        pointerEvents:'none',
    });
  
    // Create the fill element
    const fill = document.createElement('div');
    fill.classList.add('yt-spec-touch-feedback-shape__fill', '__web-inspector-hide-shortcut__');
      Object.assign(fill.style, {
        display: 'block',
        position: 'absolute',
        top: '0px',
        left: '0px',
        width: '100%',
        height: '100%',
        pointerEvents:'none',
    });
  
    // Append the stroke and fill to the container
    feedbackContainer.appendChild(stroke);
    feedbackContainer.appendChild(fill);
  
    // Append the container to the button
    btn.appendChild(feedbackContainer);
  
  }
  
  // When the page loads, create the button
  window.addEventListener('load', createUnlikeButton);