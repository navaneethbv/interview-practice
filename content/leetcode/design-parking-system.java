class ParkingSystem {
    private final int[] available;
    public ParkingSystem(int big,int medium,int small) {available=new int[]{big,medium,small};}
    public boolean addCar(int carType) {if(available[carType-1]==0) return false;available[carType-1]--;return true;}
}
