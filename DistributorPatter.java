import java.util.Arrays;
import java.util.List;

public class DistributorPatter {
    public static void main(String[] args) {
        // Create workers
        Worker worker1 = new Worker("Alice");
        Worker worker2 = new Worker("Bob");
        Worker worker3 = new Worker("Charlie");

        // Create a distributor with the workers
        Distributor distributor = new Distributor(Arrays.asList(worker1, worker2, worker3));

        // Create tasks
        Task printTask1 = new PrintTask("Hello World");
        Task calculationTask1 = new CalculationTask(10);
        Task printTask2 = new PrintTask("Design Patterns in Java");
        Task calculationTask2 = new CalculationTask(25);

        // Distribute tasks
        distributor.distributeTask(printTask1);
        distributor.distributeTask(calculationTask1);
        distributor.distributeTask(printTask2);
        distributor.distributeTask(calculationTask2);
    }
}



interface Task {
    void execute();
}


class PrintTask implements Task {
    private String message;

    public PrintTask(String message) {
        this.message = message;
    }

    @Override
    public void execute() {
        System.out.println("Executing PrintTask: " + message);
    }
}

class CalculationTask implements Task {
    private int number;

    public CalculationTask(int number) {
        this.number = number;
    }

    @Override
    public void execute() {
        System.out.println("Executing CalculationTask, square of " + number + " is: " + (number * number));
    }
}



class Distributor {
    private List<Worker> workers;
    private int currentWorkerIndex = 0;

    public Distributor(List<Worker> workers) {
        this.workers = workers;
    }

    public void distributeTask(Task task) {
        Worker worker = workers.get(currentWorkerIndex);
        worker.performTask(task);
        currentWorkerIndex = (currentWorkerIndex + 1) % workers.size();
    }
}


class Worker {
    private String name;

    public Worker(String name) {
        this.name = name;
    }

    public void performTask(Task task) {
        System.out.println("Worker " + name + " is performing task...");
        task.execute();
    }
}
