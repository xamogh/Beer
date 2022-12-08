import * as React from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    styled,
    TextField,
} from "@mui/material";
import Modal, { useModal } from "@ebay/nice-modal-react";
import { Controller, useForm } from "react-hook-form";
import { BeerMutation, useCreateMyBeer } from "../../../api/beerServer";
import { LoadingButton } from "@mui/lab";
import beerImage from "../../../assets/beer.png";

const StyledImage = styled("img")(() => ({
    border: "1px solid lightgrey",
    marginBottom: "16px",
    padding: "16px",
}));

interface CreateBeerFormDialogProps {
    onActionEvent: (
        mutationValues: BeerMutation,
        nextAction: () => void
    ) => void;
}

const CreateBeerFormDialog = Modal.create(
    (props: CreateBeerFormDialogProps) => {
        const { onActionEvent } = props;

        const modal = useModal();
        const {
            handleSubmit,
            reset,
            control,
            formState: { errors },
        } = useForm<BeerMutation>({
            defaultValues: {
                name: "",
                description: "",
                genre: "",
                image: beerImage,
            },
        });

        const [loading, setLoading] = React.useState(false);

        const onSubmit = async (data: BeerMutation) => {
            setLoading(true);
            await onActionEvent(data, () => {
                setLoading(false);
                modal.hide();
                reset();
            });
        };

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
                    <DialogTitle id="alert-dialog-title">
                        Add a New Beer
                    </DialogTitle>
                    <DialogContent>
                        <StyledImage src={beerImage} height="120px" />
                        <Controller
                            name="name"
                            control={control}
                            rules={{ required: "This field is required" }}
                            render={({ field: { onChange, value } }) => (
                                <TextField
                                    onChange={onChange}
                                    fullWidth
                                    value={value}
                                    size="small"
                                    placeholder="Name"
                                    error={!!errors.name}
                                    helperText={errors.name?.message}
                                />
                            )}
                        />
                        <Controller
                            name="genre"
                            rules={{ required: "This field is required" }}
                            control={control}
                            render={({ field: { onChange, value } }) => (
                                <TextField
                                    sx={{ mt: 1 }}
                                    onChange={onChange}
                                    fullWidth
                                    value={value}
                                    size="small"
                                    placeholder="Genre"
                                    error={!!errors.genre}
                                    helperText={errors.genre?.message}
                                />
                            )}
                        />
                        <Controller
                            name="description"
                            rules={{ required: "This field is required" }}
                            control={control}
                            render={({ field: { onChange, value } }) => (
                                <TextField
                                    sx={{ mt: 1 }}
                                    onChange={onChange}
                                    fullWidth
                                    value={value}
                                    size="small"
                                    multiline
                                    rows={4}
                                    placeholder="Description"
                                    error={!!errors.description}
                                    helperText={errors.description?.message}
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
                        <LoadingButton
                            onClick={handleSubmit(onSubmit)}
                            autoFocus
                            variant="contained"
                            loading={loading}
                        >
                            Save
                        </LoadingButton>
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

    const createMyBeerMutation = useCreateMyBeer();

    const onAddEvent = () => {
        Modal.show(CreateBeerFormDialog, {
            onActionEvent: async (
                data: BeerMutation,
                nextActions: () => void
            ) => {
                await createMyBeerMutation.mutateAsync(data);
                nextActions();
            },
        });
    };

    return render(onAddEvent);
}
