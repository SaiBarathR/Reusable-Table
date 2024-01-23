import { useToast } from "@chakra-ui/react"

type ToastStatus = "info" | "warning" | "success" | "error" | "loading";

export default function useAlerts() {

    const toast = useToast()

    const triggerToast = (title: any, status: ToastStatus) => {
        toast({
            title: title,
            isClosable: false,
            position: 'top',
            status: status
        })
    }

    const errorToast = (title: any) => triggerToast(title, 'error')

    const successToast = (title: any) => triggerToast(title, 'success')

    return { errorToast, successToast };
}
