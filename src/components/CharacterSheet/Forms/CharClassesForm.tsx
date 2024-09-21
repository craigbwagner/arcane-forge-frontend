import useStore from "@/store/store";
import { UseFormReturn } from "react-hook-form";
import { FormData } from "@/pages/EditCharacterPage";

function CharClassesForm({
  form,
}: {
  form: UseFormReturn<FormData, any, undefined>;
}) {
  return <div>CharClassesForm</div>;
}

export default CharClassesForm;
