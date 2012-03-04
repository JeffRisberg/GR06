import com.incra.Book

class BootStrap {

    def init = { servletContext ->

        def publishers = [
            "Random House",
            "Houghton-Mifflen",
            "Tor",
            "Doubleday",
            "Vantage Press",
            "HBJ",
            "Bantam",
            "Grosset-Dunlap"
        ]
        def subtitles = [
            "Danger under the Sea",
            "A Clue for Nancy",
            "Mr. Damon to the Rescue",
            "Bringing up the lost Submarine",
            "Searching for Gold",
            "Adventure in the Air",
            "Naval Terror of the Seas"
        ]
        Book book

        book = new Book(title: "Giant Robot", author: "Appleton II", publisher: "Grosset & Dunlap", price: 12.77, pageCount: 200 )
        book.save()
        book = new Book(title: "Jetmarine", author: "Appleton II", subtitle: "Crossing the Ocean", publisher: "Grosset & Dunlap", price: 13.77, pageCount: 210 )
        book.save()
        book = new Book(title: "Atomic Earth Blaster", publisher: "Grosset & Dunlap", subtitle: "Adventure at the South Pole", author: "Appleton II", price: 12.45, pageCount: 160 )
        book.save()
        book = new Book(title: "Fellowship of the Ring", publisher: "George Allen & Unwin", author: "J. R. R. Tolkien", price: 29.99, pageCount: 301 )
        book.save()
        book = new Book(title: "The Two Towers", publisher: "George Allen & Unwin", author: "J. R. R. Tolkien", price: 29.95, pageCount: 308 )
        book.save()
        book = new Book(title: "Ocean Airport", subtitle: "Foiling the Hargolanders", publisher: "Grosset & Dunlap", author: "Appleton", price: 29.99, pageCount: 180 )
        book.save()
        book = new Book(title: "The Tower Treasure", publisher: "Grosset & Dunlap", author: "Franklin W. Dixon", price: 9.9, pageCount: 267 )
        book.save()
        book = new Book(title: "The Hidden Signpost", publisher: "Grosset & Dunlap", author: "Franklin W. Dixon", price: 9.9, pageCount: 278 )
        book.save()

        for (int i = 3; i < 2000; i ++) {
            book = new Book(title: "The $i Towers",
                    publisher: publishers[(int) (publishers.size() * Math.random())],
                    subtitle: subtitles[(int) (subtitles.size() * Math.random())],
                    author: "Unknown",
                    price: 12.34+15.0*Math.random(),
                    pageCount: 200 + (int) (60.0 * Math.random())
                    )
            book.save()
        }
    }
    def destroy = {
    }
}
