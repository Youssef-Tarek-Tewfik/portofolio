// Call the main function as soon as the DOM is loaded
document.addEventListener("DOMContentLoaded", main);

// Global state object
let state = {
    searchWarned: false
};

// Warn the user only once about the non functioning search bar
function searchHandler() {
    if (!state.searchWarned) {
        alert("Caution: Search is not available yet");
        state.searchWarned = true;
    }
}

// Handle mouse hover on Side Bar Buttons
function enterHoverHandler(target) {
    target.classList.add('hoveredButton');
}

// Handle mouse leave from Side Bar Buttons
function leaveHoverHandler(target) {
    target.classList.remove('hoveredButton');
}

// Function to check if an element is on viewport
function isVisible(element) {
    const top = element.getBoundingClientRect().top;
    const bottom = element.getBoundingClientRect().bottom;
    const result = (top < window.visualViewport.height && bottom > 0);
    return result;
}

// Function to be called on Scroll event
// Loops over all Sections to check for visibility
// Then Loops over all buttons to activate and deactivate as needed
function setActiveSection(sectionElements, buttons) {
    let i;
    for (i = 0; i < 4; ++i) {
        const visible = isVisible(sectionElements[i]);
        if (visible) {
            break;
        }
    }
    for (let j = 0; j < 4; ++j) {
        if (i === j) {
            buttons[i].classList.add('activeButton');
        }
        else {
            buttons[j].classList.remove('activeButton');
        }
    }
}

// Function to handle button clicks
// It scrolls to the required element till its visible
function handleClick(element) {
    element.scrollIntoView({behavior: "smooth"});
}

function main() {
    // Creating a listener to call the handler function
    document.querySelector("#searchBar").addEventListener("click", searchHandler);
    
    // Fetching all section elements into an array
    const sectionNames = ["intro", "projects", "links", "reviews"];
    const sectionElements = [];
    for (const name of sectionNames) {
        sectionElements.push(document.getElementById(name));
    }
    
    // Fetching all Buttons to loop over and add the hover listeners
    // Also add the button click listeners in order
    const buttons = document.querySelectorAll('.sideBarButton');
    let i = 0;
    for (const button of buttons) {
        button.addEventListener("mouseenter", e => enterHoverHandler(button));
        button.addEventListener("mouseleave", e => leaveHoverHandler(button));
        
        const section = sectionElements[i];
        button.addEventListener("click", e => handleClick(section));
        i += 1;
    }

    // Adding the scroll event listener to the DOM
    document.querySelector('#mainDiv').addEventListener("scroll", () => setActiveSection(sectionElements, buttons));
}
