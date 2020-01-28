window.InputEvent = window.Event || window.InputEvent;

export default function type(element, message = '') {
    element.textContent = message;
    return element.dispatchEvent(new InputEvent('input', {
        bubbles: true
    }));
}
