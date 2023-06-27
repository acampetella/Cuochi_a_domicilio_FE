import toast from 'react-hot-toast';

export class Toast {
    constructor(message) {
        this.message = message;
    }

    notifyError() {
        toast.error(this.message);
    }

    notifyMessage() {
        toast.success(this.message);
    }

}