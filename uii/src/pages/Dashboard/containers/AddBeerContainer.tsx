import * as React from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
} from "@mui/material";
import Modal, { useModal } from "@ebay/nice-modal-react";
import { Controller, useForm } from "react-hook-form";

interface CreateBeerFormDialogProps {
    onActionEvent: () => void;
}

const CreateBeerFormDialog = Modal.create(
    (props: CreateBeerFormDialogProps) => {
        const { onActionEvent } = props;

        const modal = useModal();
        const { handleSubmit, reset, control } = useForm({
            defaultValues: {
                beerName: "",
                genre: "",
                description: "",
            },
        });
        const onSubmit = (data: any) => console.log(data);

        return (
            <Dialog
                open={modal.visible}
                onClose={() => modal.hide()}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                maxWidth="xs"
                fullWidth
            >
                <form>
                    <DialogTitle
                        id="alert-dialog-title"
                        onClick={onActionEvent}
                    >
                        Add a New Beer
                    </DialogTitle>
                    <DialogContent>
                        <Controller
                            name="beerName"
                            control={control}
                            render={({ field: { onChange, value } }) => (
                                <TextField
                                    onChange={onChange}
                                    fullWidth
                                    value={value}
                                    size="small"
                                    placeholder="Name"
                                />
                            )}
                        />
                        <Controller
                            name="genre"
                            control={control}
                            render={({ field: { onChange, value } }) => (
                                <TextField
                                    sx={{ mt: 1 }}
                                    onChange={onChange}
                                    fullWidth
                                    value={value}
                                    size="small"
                                    placeholder="Genre"
                                />
                            )}
                        />
                        <Controller
                            name="description"
                            control={control}
                            render={({ field: { onChange, value } }) => (
                                <TextField
                                    sx={{ mt: 1 }}
                                    onChange={onChange}
                                    fullWidth
                                    value={value}
                                    size="small"
                                    multiline
                                    rows={8}
                                    placeholder="Description"
                                />
                            )}
                        />
                    </DialogContent>
                    <DialogActions sx={{ px: 3, pb: 2 }}>
                        <Button
                            onClick={() => {
                                modal.hide();
                                reset();
                            }}
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleSubmit(onSubmit)}
                            autoFocus
                            variant="contained"
                        >
                            Save
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        );
    }
);

interface Props {
    render: (onAddEvent: () => void) => JSX.Element;
}

export default function AddBeerContainer(props: Props) {
    const { render } = props;

    const onAddEvent = () => {
        Modal.show(CreateBeerFormDialog, {
            onActionEvent: () => console.log("do"),
        });
    };

    return render(onAddEvent);
}
