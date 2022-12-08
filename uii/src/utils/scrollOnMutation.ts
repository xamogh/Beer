/**
 * Watches DOM mutation and scrolls the target node by {scrollBy} pixels
 * @param  {string} nodeId
 * @param  {number} scrollBy
 */
export default function scrollOnMutation(nodeId: string, scrollBy: number) {
    const node = document.getElementById(nodeId);
    if (!node) return;
    let shouldCleanUp = false;
    const observer = new MutationObserver(() => {
        node.scrollBy({
            top: node.offsetHeight - scrollBy,
            behavior: "smooth",
        });
        shouldCleanUp = true;
    });
    observer.observe(node, { childList: true, subtree: true });
    if (shouldCleanUp) {
        observer.disconnect();
    }
}
