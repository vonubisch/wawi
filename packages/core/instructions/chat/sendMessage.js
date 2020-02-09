import input from '../input';

export default function sendMessage() {
    input.click(document.querySelector('span[data-icon="send"]'));
}