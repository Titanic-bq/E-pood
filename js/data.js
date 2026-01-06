export const fetchProducts = async () => {
  try {
    const response = await fetch("./js/data.json");

    if (!response.ok) {
      throw new Error("Andmete laadimine ebaõnnestus");
    }

    return await response.json();
  } catch (error) {
    console.error("Viga:", error);
    return [];
  }
};
