import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MenuNav from "../ui/MenuNav";

afterEach(() => {
  cleanup();
});

describe("MenuNav", () => {
  it("bloqueia acesso ao Clima quando não autenticado", () => {
    const onNavigate = vi.fn();

    render(
      <MenuNav onNavigate={onNavigate} currentPage="login" isAuth={false} />
    );

    const btnClima = screen.getByRole("button", { name: /clima/i });
    expect(btnClima).toBeDisabled();
  });

  it("permite navegar para Clima quando autenticado", async () => {
    const user = userEvent.setup();
    const onNavigate = vi.fn();

    render(
      <MenuNav onNavigate={onNavigate} currentPage="login" isAuth={true} />
    );

    const btnClima = screen.getByRole("button", { name: /clima/i });
    expect(btnClima).toBeEnabled();

    await user.click(btnClima);
    expect(onNavigate).toHaveBeenCalledWith("clima");
  });
});
