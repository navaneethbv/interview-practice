class TextEditor {
    private final StringBuilder left = new StringBuilder();
    private final StringBuilder right = new StringBuilder();

    public TextEditor() {
    }

    public void addText(String text) {
        left.append(text);
    }

    public int deleteText(int k) {
        int deleted = Math.min(k, left.length());
        left.setLength(left.length() - deleted);
        return deleted;
    }

    public String cursorLeft(int k) {
        for (int i = Math.min(k, left.length()); i > 0; i--) {
            right.append(left.charAt(left.length() - 1));
            left.setLength(left.length() - 1);
        }
        return tail();
    }

    public String cursorRight(int k) {
        for (int i = Math.min(k, right.length()); i > 0; i--) {
            left.append(right.charAt(right.length() - 1));
            right.setLength(right.length() - 1);
        }
        return tail();
    }

    private String tail() {
        return left.substring(Math.max(0, left.length() - 10));
    }
}
