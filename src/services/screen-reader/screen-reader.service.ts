export class ScreenReaderService {
  private liveTextDiv = ScreenReaderService.createLiveTextDiv();
  private readOutTimeoutId: number | null = null;

  private get liveText() {
    return this.liveTextDiv.innerText;
  }

  private set liveText(liveText: string) {
    this.liveTextDiv.innerText = liveText;
  }

  private static createLiveTextDiv(assertive = true) {
    const div = document.createElement('div');
    div.setAttribute('aria-live', assertive ? 'assertive' : 'polite');

    // make it invisible and non-interactive
    div.style.position = 'absolute';
    div.style.opacity = '0';
    div.style.pointerEvents = 'none';

    return div;
  }

  init() {
    this.destroy();

    document.body.append(this.liveTextDiv);
  }

  destroy() {
    if (!this.liveTextDiv) {
      return;
    }
    this.liveTextDiv.remove();
  }

  readOut(text: string) {
    if (this.readOutTimeoutId !== null) {
      window.clearTimeout(this.readOutTimeoutId);
      this.readOutTimeoutId = null;
    }
    const repetitive = this.liveText === text;
    if (repetitive) {
      this.liveText = ''; // empty the text for a short period of time when the same text needs to be read out consequently
      this.readOutTimeoutId = window.setTimeout(() => {
        this.readOutTimeoutId = null;
        this.readOut(text);
      }, 500);
    } else {
      this.liveText = text;
    }
    return repetitive;
  }
}
