import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import useStore from "@/store/store";
import * as characterService from "@/services/characterService";

function DeleteCharAlert() {
  const [isOpen, setIsOpen] = useState(false);
  const currentCharacter = useStore((state) => state.currentCharacter);
  const updateUser = useStore((state) => state.updateUser);
  const user = useStore((state) => state.user);
  const navigate = useNavigate();

  const onClose = () => {
    setIsOpen(false);
  };

  const onOpen = () => {
    setIsOpen(true);
  };

  async function handleDeleteChar() {
    const characterId = currentCharacter._id as string;
    let tempUser;

    if (user) {
      tempUser = {
        ...user,
      };
      let updatedUserCharacters = tempUser?.characters.filter(
        (character) => character._id !== currentCharacter._id,
      );
      tempUser.characters = updatedUserCharacters;
      updateUser(tempUser);
    }

    try {
      characterService.deleteCharacter(characterId);
    } catch (err: unknown) {
      console.log(err);
    }

    navigate("/characters");
  }

  return (
    <>
      <Button variant="outline" onClick={onOpen}>
        Delete
      </Button>
      <AlertDialog onOpenChange={onClose} open={isOpen} defaultOpen={isOpen}>
        <AlertDialogTrigger asChild></AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteChar}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export default DeleteCharAlert;
