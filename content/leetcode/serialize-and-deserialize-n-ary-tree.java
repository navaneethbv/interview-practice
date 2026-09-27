class Codec {
    public String serialize(Node root) {
        StringBuilder out=new StringBuilder(); encode(root,out);return out.toString();
    }
    private void encode(Node node,StringBuilder out) {
        if(node==null){out.append("# ");return;}
        out.append(node.val).append(' ').append(node.children.size()).append(' ');
        for(Node child:node.children)encode(child,out);
    }
    public Node deserialize(String data) { return decode(new Scanner(data)); }
    private Node decode(Scanner in) {
        String value=in.next();if(value.equals("#"))return null;
        Node node=new Node(Integer.parseInt(value));int size=in.nextInt();
        for(int i=0;i<size;i++)node.children.add(decode(in));return node;
    }
}
