class AnimalShelter {
    private record Animal(int arrival, String name) {}

    private int arrivals = 0;
    private final Deque<Animal> dogs = new ArrayDeque<>();
    private final Deque<Animal> cats = new ArrayDeque<>();

    public void enqueue(String name, String species) {
        Animal animal = new Animal(arrivals++, name);
        if (species.equals("dog")) {
            dogs.addLast(animal);
        } else {
            cats.addLast(animal);
        }
    }

    public String dequeueAny() {
        if (dogs.isEmpty()) {
            return dequeueCat();
        }
        if (cats.isEmpty()) {
            return dequeueDog();
        }
        return dogs.peekFirst().arrival() < cats.peekFirst().arrival() ? dequeueDog() : dequeueCat();
    }

    public String dequeueDog() {
        return dogs.isEmpty() ? "" : dogs.pollFirst().name();
    }

    public String dequeueCat() {
        return cats.isEmpty() ? "" : cats.pollFirst().name();
    }
}
