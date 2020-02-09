export default function scrollTo({ top = null }) {
    if (top !== null) {
        return document.querySelector('#pane-side').scrollTop += top;
    }
}