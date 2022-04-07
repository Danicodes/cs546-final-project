// An enum for statuses
class Status {
    static PENDING = new Status("Pending");
    static APPROVED = new Status("Approved");
    static REJECTED = new Status("Rejected");
    static COMPLETED = new Status("Completed");

    constructor(name){
        this.name = name;
    }
}

module.exports = Status;