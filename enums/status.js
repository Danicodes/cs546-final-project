// An enum for statuses
class Status {
    static PENDING = new Status("Pending");
    static APPROVED = new Status("Approved");
    static REJECTED = new Status("Rejected");
    static COMPLETED = new Status("Completed");

    constructor(name){
        this.name = name;
    };

    static get(status){
        switch (status.trim().toLowerCase()) {
            case "pending":
                return this.PENDING;
            case "approved":
                return this.APPROVED;
            case "rejected":
                return this.REJECTED;
            case "completed":
                return this.COMPLETED;
            default:
                throw new Error(`Error: Undefined status`);
        }
    }
}

module.exports = Status;