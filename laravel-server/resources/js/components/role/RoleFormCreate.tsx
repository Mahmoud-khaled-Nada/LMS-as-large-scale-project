import { Label } from "@windmill/react-ui";
import { FormContainer } from "../ui/forms/FormContainer";
import InputField from "../ui/input/InputField";
import { useForm } from "@inertiajs/react";
import { useTranslation } from "react-i18next";
import { FormEventHandler } from "react";
import { SpinnerButton } from "../ui/buttons/SpinnerButton";
import { toast } from "react-toastify";

function RoleFormCreate() {
    const { t } = useTranslation();
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        permissions: ["1", "2", "3", "4"], // Static permissions array
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post("/role/store", {
            data,
            onSuccess: () => {
                reset("name");
                toast.success("Role created successfully");
            },
            onError: (error) => {
                console.error(error);
                toast.error("Error creating role");
            },
            onFinish: () => reset("name"),
        });
    };

    return (
        <FormContainer title={t("create")} submit={submit}>
            <div className="flex flex-col items-center">
                <Label className="w-full max-w-[50%]">
                    <span>{t("roleName")}</span>
                    <InputField
                        name="name"
                        value={data.name}
                        isFocused={true}
                        isError={errors.name}
                        onChange={(e) => setData("name", e.target.value)}
                    />
                </Label>
                {/* Buttons */}
                <div className="flex justify-center items-center m-6 gap-3 w-full max-w-[50%]">
                    <SpinnerButton
                        isLoading={processing}
                        disabled={!data.name || processing}
                        route="/roles"
                    />
                </div>
            </div>
        </FormContainer>
    );
}

export default RoleFormCreate;
