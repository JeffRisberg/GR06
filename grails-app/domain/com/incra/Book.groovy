package com.incra

class Book {

    String title
    String subtitle
    String author
    String publisher
    double price
    int pageCount

    static constraints = {
        subtitle(nullable: true)
        publisher(nullable: true)
    }
}
