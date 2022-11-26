import { fileUpload } from "../../helpers/fileUpload";

describe("Pruebas en file upload", () => {
  test("debe de cargar el archivo y retornar el URL", async () => {
    const resp = await fetch(
      "https://cdn.pixabay.com/photo/2012/08/27/14/19/mountains-55067_960_720.png"
    );
    const blob = await resp.blob();
    const file = new File([blob], "foto.png");
    const url = await fileUpload(file);
    expect(typeof url).toBe("string");
  });

  test("debe de retornar un error", async () => {
    const file = new File([], "foto.png");
    const url = await fileUpload(file);
    expect(typeof url).toBe("object");
  });
});
