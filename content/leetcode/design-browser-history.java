class BrowserHistory {
    private final List<String> pages = new ArrayList<>();
    private int index = 0;

    public BrowserHistory(String homepage) {
        pages.add(homepage);
    }

    public void visit(String url) {
        while (pages.size() > index + 1) {
            pages.remove(pages.size() - 1);
        }
        pages.add(url);
        index++;
    }

    public String back(int steps) {
        index = Math.max(0, index - steps);
        return pages.get(index);
    }

    public String forward(int steps) {
        index = Math.min(pages.size() - 1, index + steps);
        return pages.get(index);
    }
}
