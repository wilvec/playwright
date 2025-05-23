import { test, expect } from "@playwright/test";

test("Prueba ingreso de sesión no válido", async ({ page }) => {
  await page.goto("http://localhost:5173/login");
  await page.getByRole("textbox", { name: "Email address" }).click();
  await page
    .getByRole("textbox", { name: "Email address" })
    .fill("user@example111.com");
  await page.getByRole("textbox", { name: "Password" }).click();
  await page.getByRole("textbox", { name: "Password" }).fill("password1231");
  await page.getByRole("button", { name: "Sign in" }).click();
  await page.waitForURL("http://localhost:5173/login");
  expect(page.getByText("Invalid email or password")).toBeVisible({
    timeout: 5000,
  });
});

test("Prueba ingreso de sesión exitoso", async ({ page }) => {
  await page.goto("http://localhost:5173/login");
  await page.getByRole("textbox", { name: "Email address" }).click();
  await page
    .getByRole("textbox", { name: "Email address" })
    .fill("user@example.com");
  await page.getByRole("textbox", { name: "Password" }).click();
  await page.getByRole("textbox", { name: "Password" }).fill("password123");
  await page.getByRole("button", { name: "Sign in" }).click();
  expect(page.url()).toBe("http://localhost:5173/");
});

test("Prueba agregar auto", async ({ page }) => {
  await page.goto("http://localhost:5173/addcar");
  await page.getByRole("textbox", { name: "Make" }).click();
  await page.getByRole("textbox", { name: "Make" }).fill("Toyota");
  await page.getByRole("textbox", { name: "Model" }).click();
  await page.getByRole("textbox", { name: "Model" }).fill("Corolla");
  await page.getByRole("spinbutton", { name: "Year" }).click();
  await page.getByRole("spinbutton", { name: "Year" }).fill("2020");
  await page.getByRole("button", { name: "Add car" }).click();
  await expect(page.getByText("Car added successfully")).toBeVisible();
}
);
