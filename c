using System;
using System.IO;
using System.Text;
using System.Runtime.Serialization;
using System.Runtime.Serialization.Json;

[DataContract]
public class Node
{
    [DataMember(Order = 0)]
    public string Text { get; set; }

    [DataMember(Order = 1, EmitDefaultValue = false)]
    public Node Left { get; set; }   // NÃO

    [DataMember(Order = 2, EmitDefaultValue = false)]
    public Node Right { get; set; }  // SIM

    public bool IsLeaf
    {
        get { return Left == null && Right == null; }
    }

    public Node()
    {
        Text = "";
        Left = null;
        Right = null;
    }

    public Node(string text, Node left = null, Node right = null)
    {
        Text = text;
        Left = left;
        Right = right;
    }
}

public static class Program
{
    private const string TreeFileName = "tree.json";

    public static void Main()
    {
        Console.InputEncoding = Encoding.UTF8;
        Console.OutputEncoding = Encoding.UTF8;

        Node root = LoadTree(TreeFileName);
        RepairTree(root);

        Console.WriteLine("=== Adivinhe o Filme (Árvore Binária: Sim/Não) ===");
        Console.WriteLine("Pense em um FILME. Vou fazer perguntas de Sim/Não.");
        Console.WriteLine("Regra: ESQUERDA = NÃO | DIREITA = SIM\n");

        while (true)
        {
            root = PlayRound(root);
            SaveTree(root, TreeFileName);

            if (!ReadYesNo("\nDeseja jogar novamente?"))
                break;

            Console.WriteLine();
        }

        Console.WriteLine("\nEncerrado. (Arquivo: " + TreeFileName + ")");
    }

    private static Node PlayRound(Node root)
    {
        Node current = root;
        Node parent = null;
        bool cameFromYes = false;

        while (!current.IsLeaf)
        {
            bool yes = ReadYesNo(current.Text);

            parent = current;
            cameFromYes = yes;

            current = yes ? current.Right : current.Left;

            // Segurança caso JSON esteja inconsistente
            if (current == null)
            {
                current = new Node("Filme desconhecido");
                break;
            }
        }

        if (ReadYesNo("Você pensou em \"" + current.Text + "\"?"))
        {
            Console.WriteLine("Acertei!");
            return root;
        }

        string correctMovie = ReadRequiredText("Qual era o filme correto? ");
        string question = ReadRequiredText("Digite uma pergunta que diferencie \"" + correctMovie + "\" de \"" + current.Text + "\": ");
        bool correctIsYes = ReadYesNo("Para \"" + correctMovie + "\", a resposta dessa pergunta é SIM?");

        Node newQuestionNode = BuildLearningNode(question, correctMovie, current.Text, correctIsYes);

        if (parent == null)
        {
            Console.WriteLine("Aprendi um novo filme!");
            return newQuestionNode;
        }

        if (cameFromYes) parent.Right = newQuestionNode;
        else parent.Left = newQuestionNode;

        Console.WriteLine("Aprendi um novo filme!");
        return root;
    }

    private static Node BuildLearningNode(string question, string correctMovie, string oldGuess, bool correctIsYes)
    {
        Node questionNode = new Node(question);

        Node correctNode = new Node(correctMovie);
        Node oldGuessNode = new Node(oldGuess);

        // Regra da atividade: esquerda=NÃO, direita=SIM
        if (correctIsYes)
        {
            questionNode.Left = oldGuessNode;   // NÃO
            questionNode.Right = correctNode;   // SIM
        }
        else
        {
            questionNode.Left = correctNode;    // NÃO
            questionNode.Right = oldGuessNode;  // SIM
        }

        return questionNode;
    }

    private static bool ReadYesNo(string prompt)
    {
        while (true)
        {
            Console.Write(prompt + " (s/n): ");
            string input = Console.ReadLine();
            if (input == null) input = "";

            input = input.Trim().ToLowerInvariant();

            if (input == "s" || input == "sim") return true;
            if (input == "n" || input == "nao" || input == "não") return false;

            Console.WriteLine("Resposta inválida. Digite apenas 's' ou 'n'.");
        }
    }

    private static string ReadRequiredText(string prompt)
    {
        while (true)
        {
            Console.Write(prompt);
            string text = Console.ReadLine();
            if (text == null) text = "";

            text = text.Trim();
            if (text.Length > 0) return text;

            Console.WriteLine("Entrada vazia. Tente novamente.");
        }
    }

    private static void SaveTree(Node root, string path)
    {
        try
        {
            var serializer = new DataContractJsonSerializer(typeof(Node));
            using (FileStream fs = File.Create(path))
            {
                serializer.WriteObject(fs, root);
            }
        }
        catch
        {
            // Em alguns ambientes online o FS pode ser restrito; o jogo continua sem salvar.
        }
    }

    private static Node LoadTree(string path)
    {
        try
        {
            if (!File.Exists(path))
                return DefaultTree();

            var serializer = new DataContractJsonSerializer(typeof(Node));
            using (FileStream fs = File.OpenRead(path))
            {
                object obj = serializer.ReadObject(fs);
                Node root = obj as Node;
                return root ?? DefaultTree();
            }
        }
        catch
        {
            return DefaultTree();
        }
    }

    private static Node DefaultTree()
    {
        // Base inicial pequena (vai aprendendo):
        // "É uma animação?"
        //   NÃO -> "É um filme de super-herói?"
        //            NÃO -> "Titanic"
        //            SIM -> "Vingadores"
        //   SIM -> "Toy Story"
        return new Node(
            "É uma animação?",
            new Node(
                "É um filme de super-herói?",
                new Node("Titanic"),
                new Node("Vingadores")
            ),
            new Node("Toy Story")
        );
    }

    // Conserta nós de pergunta sem filhos (caso arquivo JSON esteja incompleto)
    private static void RepairTree(Node node)
    {
        if (node == null) return;
        if (node.IsLeaf) return;

        if (node.Left == null) node.Left = new Node("Filme desconhecido");
        if (node.Right == null) node.Right = new Node("Filme desconhecido");

        RepairTree(node.Left);
        RepairTree(node.Right);
    }
}
