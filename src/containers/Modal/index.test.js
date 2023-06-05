import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Modal from "./index.js";

describe("When Modal data is created", () => {
  it("a modal content is displayed", async () => {
    render(
      <Modal
        visible={true}
        Content={<div>modal content</div>}
        onClose={() => {}}
      >
        {() => <button data-testid="open-modal">Open Modal</button>}
      </Modal>
    );

    fireEvent.click(screen.getByTestId("open-modal")); // Trigger the click to open the modal

    await waitFor(() => {
      const modal = screen.queryByRole("dialog");
      expect(modal).toBeNull();
    });
  });

  describe("and a click is triggered to display the modal", () => {
    it("the content of the modal is hidden", async () => {
      render(
        <Modal
          visible={true}
          Content={<div>modal content</div>}
          onClose={() => {}}
        >
          {({ setIsOpened }) => (
            <button data-testid="close-modal" onClick={() => setIsOpened(false)}>Close Modal</button>
          )}
        </Modal>
      );
  
      fireEvent.click(screen.getAllByTestId("close-modal")[0]);
  
      await waitFor(() => {
        const modal = screen.queryByRole("dialog");
        expect(modal).toBeNull();
      });
    });
  });

  describe("and a click is triggered on the close button of the modal", () => {
    it("the content of the modal is hidden", async () => {
      render(
        <Modal
          visible={true}
          Content={<div>modal content</div>}
          onClose={() => {}}
        >
          {({ setIsOpened }) => (
            <button data-testid="close-modal" onClick={() => setIsOpened(false)}>Close Modal</button>
          )}
        </Modal>
      );

      fireEvent.click(screen.getAllByTestId("close-modal")[0]); // Trigger the click to close the modal

      await waitFor(() => {
        const modal = screen.queryByRole("dialog");
        expect(modal).toBeNull();
      });;
    });
  });
});
