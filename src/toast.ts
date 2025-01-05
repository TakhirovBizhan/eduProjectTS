// toast notification
export function showToast(message: string, color: 'green' | 'red', timeStump?: boolean) {
  const toast = document.createElement('div');
  toast.classList.add('toast');
  toast.textContent = message;

  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '1';
    if (color === 'red') {
      toast.classList.add('red_notification');
      toast.classList.remove('green_notification');
    } else if (color === 'green') {
      toast.classList.add('green_notification');
      toast.classList.remove('red_notification');
    }
  }, 100);

  if (timeStump === false || timeStump === undefined) {
    setTimeout(() => {
      toast.style.opacity = '0';
      setTimeout(() => {
        toast.remove();
      }, 500);
    }, 3000);
  }
}