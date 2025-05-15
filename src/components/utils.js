export const isLoading = (loading, button) => {
  loading
    ? (button.textContent = "Сохранение...")
    : (button.textContent = "Сохранение");
};