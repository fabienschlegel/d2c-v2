import { useEffect, useRef } from 'react';

const COPY_BUTTON_LABEL = 'Copy';
const COPIED_BUTTON_LABEL = 'Copied!';

function createCopyButton(codeEl: Element) {
  const button = document.createElement('button');
  button.classList.add('prism-copy-button');
  button.textContent = COPY_BUTTON_LABEL;

  button.addEventListener('click', () => {
    if (button.textContent === COPIED_BUTTON_LABEL) {
      return;
    }
    navigator.clipboard.writeText(codeEl.textContent || '');
    button.textContent = COPIED_BUTTON_LABEL;
    button.disabled = true;
    setTimeout(() => {
      button.textContent = COPY_BUTTON_LABEL;
      button.disabled = false;
    }, 3000);
  });

  return button;
}

const useCopyCodeToClipboard = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  const calledOnce = useRef(false);

  useEffect(() => {
    if (calledOnce.current) {
      return;
    }

    const allPres = rootRef.current?.querySelectorAll('pre');

    const cleanup: (() => void)[] = [];

    allPres?.forEach((pre) => {
      const code = pre.firstElementChild;
      if (!code || !/code/i.test(code.tagName)) {
        return;
      }

      pre.appendChild(createCopyButton(code));
    });

    calledOnce.current = true;

    return () => cleanup.forEach((f) => f());
  }, []);

  return rootRef;
};

export default useCopyCodeToClipboard;
