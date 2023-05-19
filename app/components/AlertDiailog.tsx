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
import SignOutButton from "./buttons";

interface Props {
  name?: string;
}
export default function AlertDiailog({ name }: Props) {
  return (
    <AlertDialog>
      <AlertDialogTrigger>SignOut</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure absolutely sure you want to sign out {name}
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <SignOutButton>Sign Out</SignOutButton>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
