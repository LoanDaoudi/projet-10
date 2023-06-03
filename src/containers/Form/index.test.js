import { fireEvent, render, screen } from "@testing-library/react";
import Form from "./index";

describe("When Form is created", () => {
  it("a list of fields card is displayed", async () => {
    render(<Form />);
    await screen.findByText("Email");
    await screen.findByText("Nom");
    await screen.findByText("Prénom");
    await screen.findByText("Personel / Entreprise");
  });

  describe("and a click is triggered on the submit button", () => {
    it("the success message is displayed", async () => {
      const onSuccess = jest.fn();
    
      render(<Form onSuccess={onSuccess} />);
      fireEvent.click(await screen.findByTestId("button-test-id"));
    
      const successMessages = screen.queryAllByText("Message envoyé !");
      expect(successMessages).toHaveLength(1); // Vérifier qu'un seul élément est trouvé
      expect(onSuccess).toHaveBeenCalled();
    });
  });
});
