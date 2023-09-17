import { useRef } from "react";
import { Center, AlertDialog, NativeBaseProvider, Button } from "native-base";

const DeleteAccount = ({ isOpen, onClose }) => {
  const cancelRef = useRef();

  return (
    <Center>
      <NativeBaseProvider>
        <AlertDialog
          leastDestructiveRef={cancelRef}
          isOpen={isOpen}
          onClose={onClose} // Use the onClose prop to close the modal
        >
          <AlertDialog.Content>
            <AlertDialog.CloseButton />
            <AlertDialog.Header>Delete Customer</AlertDialog.Header>
            <AlertDialog.Body>
              Are you sure? You can't undo this action afterwards.
            </AlertDialog.Body>
            <AlertDialog.Footer>
              <Button.Group space={2}>
                <Button
                  variant="unstyled"
                  colorScheme="coolGray"
                  onPress={onClose}
                  ref={cancelRef}
                >
                  Cancel
                </Button>
                <Button colorScheme="danger" onPress={onClose}>
                  Delete
                </Button>
              </Button.Group>
            </AlertDialog.Footer>
          </AlertDialog.Content>
        </AlertDialog>
      </NativeBaseProvider>
    </Center>
  );
};

export default DeleteAccount;
