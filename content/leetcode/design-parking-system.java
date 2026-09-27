class ParkingSystem {
    private final int[] available;
    public ParkingSystem(int big, int medium, int small) {
        available = new int[]{big, medium, small};
    }

    public boolean addCar(int carType) {
        int slot = carType - 1;
        if (available[slot] == 0) {
            return false;
        }
        available[slot]--;
        return true;
    }
}
