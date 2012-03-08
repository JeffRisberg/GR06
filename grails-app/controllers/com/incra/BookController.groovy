package com.incra

import java.text.DecimalFormat

import com.incra.domain.ColumnAlignment
import com.incra.domain.ColumnDataType
import com.incra.domain.ColumnDescriptor

class BookController {

    static allowedMethods = [save: "POST", update: "POST", delete: "POST"]

    static List<ColumnDescriptor> metrics = new ArrayList()

    static {
        ColumnDescriptor cd

        cd = new ColumnDescriptor("Title",        "title",     ColumnDataType.String,    ColumnAlignment.left,  "")
        metrics << cd

        cd = new ColumnDescriptor("Who Wrote It", "author",    ColumnDataType.String,    ColumnAlignment.left,  "")
        metrics << cd

        cd = new ColumnDescriptor("Subtitle",     "subtitle",  ColumnDataType.String,    ColumnAlignment.left,  "")
        metrics << cd

        cd = new ColumnDescriptor("Page Cnt",     "pageCount",  ColumnDataType.String,  ColumnAlignment.right, "")
        metrics << cd

        cd = new ColumnDescriptor("Retail Price", "price",     ColumnDataType.Financial, ColumnAlignment.right, "")
        metrics << cd

        cd = new ColumnDescriptor("Publisher",    "publisher", ColumnDataType.String,    ColumnAlignment.left,  "")
        metrics << cd
    }

    def index = {
        redirect(action: "list", params: params)
    }

    def list = {
        //params.max = Math.min(params.max ? params.int('max') : 10, 100)
        [metrics: metrics]
    }

    def create = {
        def bookInstance = new Book()
        bookInstance.properties = params
        return [bookInstance: bookInstance]
    }

    def save = {
        def bookInstance = new Book(params)
        if (bookInstance.save(flush: true)) {
            flash.message = "${message(code: 'default.created.message', args: [message(code: 'book.label', default: 'Book'), bookInstance.id])}"
            redirect(action: "show", id: bookInstance.id)
        }
        else {
            render(view: "create", model: [bookInstance: bookInstance])
        }
    }

    def show = {
        def bookInstance = Book.get(params.id)
        if (!bookInstance) {
            flash.message = "${message(code: 'default.not.found.message', args: [message(code: 'book.label', default: 'Book'), params.id])}"
            redirect(action: "list")
        }
        else {
            [bookInstance: bookInstance]
        }
    }

    def edit = {
        def bookInstance = Book.get(params.id)
        if (!bookInstance) {
            flash.message = "${message(code: 'default.not.found.message', args: [message(code: 'book.label', default: 'Book'), params.id])}"
            redirect(action: "list")
        }
        else {
            return [bookInstance: bookInstance]
        }
    }

    def update = {
        def bookInstance = Book.get(params.id)
        if (bookInstance) {
            if (params.version) {
                def version = params.version.toLong()
                if (bookInstance.version > version) {

                    bookInstance.errors.rejectValue("version", "default.optimistic.locking.failure", [
                        message(code: 'book.label', default: 'Book')]
                    as Object[], "Another user has updated this Book while you were editing")
                    render(view: "edit", model: [bookInstance: bookInstance])
                    return
                }
            }
            bookInstance.properties = params
            if (!bookInstance.hasErrors() && bookInstance.save(flush: true)) {
                flash.message = "${message(code: 'default.updated.message', args: [message(code: 'book.label', default: 'Book'), bookInstance.id])}"
                redirect(action: "show", id: bookInstance.id)
            }
            else {
                render(view: "edit", model: [bookInstance: bookInstance])
            }
        }
        else {
            flash.message = "${message(code: 'default.not.found.message', args: [message(code: 'book.label', default: 'Book'), params.id])}"
            redirect(action: "list")
        }
    }

    def delete = {
        def bookInstance = Book.get(params.id)
        if (bookInstance) {
            try {
                bookInstance.delete(flush: true)
                flash.message = "${message(code: 'default.deleted.message', args: [message(code: 'book.label', default: 'Book'), params.id])}"
                redirect(action: "list")
            }
            catch (org.springframework.dao.DataIntegrityViolationException e) {
                flash.message = "${message(code: 'default.not.deleted.message', args: [message(code: 'book.label', default: 'Book'), params.id])}"
                redirect(action: "show", id: params.id)
            }
        }
        else {
            flash.message = "${message(code: 'default.not.found.message', args: [message(code: 'book.label', default: 'Book'), params.id])}"
            redirect(action: "list")
        }
    }

    def gridData = {
        println "AJAX callback for gridData " + params
        def gridData = [:]

        DecimalFormat decF = new DecimalFormat("###,##0.00")
        DecimalFormat intF = new DecimalFormat("###,##0")

        // Decode sort
        def dataKey = params['sorting[0][dataKey]']
        def sortDirection = params['sorting[0][sortDirection]']

        params.sort = dataKey
        params.order = sortDirection && sortDirection == "ascending" ? "desc" : "asc"

        // Data
        List<Book> books = Book.list(params)

        def bookSeries = []
        for (Book book : books) {
            String priceStr = decF.format(book.price)
            String pageCountStr = intF.format(book.pageCount)

            def x = [ title: book.title, author: book.author, pageCount: pageCountStr,
                        subtitle: book.subtitle, publisher: book.publisher, price: priceStr ]
            bookSeries << x
        }
        gridData['count'] = Book.count()
        gridData['results'] = bookSeries

        // Metadata
        def columns = []
        metrics.each { ColumnDescriptor cd ->
            columns.add(cd.fieldName)
        }
        gridData['columns'] = columns

        def wrapper = [:]
        wrapper['series'] = gridData

        //println "returning " + wrapper.encodeAsJSON()
        render wrapper.encodeAsJSON();
    }
}
