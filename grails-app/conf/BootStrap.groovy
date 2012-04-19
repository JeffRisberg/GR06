
import com.incra.biz.Account
import com.incra.biz.AccountType
import com.incra.biz.Client
import com.incra.biz.SalesOrder
import com.incra.biz.Product
import com.incra.biz.ProductType
import com.incra.pageFramework.Menu
import com.incra.pageFramework.MenuItem
import com.incra.pageFramework.Module
import com.incra.security.Role
import com.incra.security.User
import com.incra.security.UserRole

import grails.util.Environment

/**
 * The <i>BootStrap</i> class has been extended to set up reference data.
 *
 * @author Jeffrey Risberg
 * @since 11/17/11
 */
class BootStrap {

    def init = { servletContext ->
        switch (Environment.current) {
            case Environment.DEVELOPMENT:
            case Environment.TEST:
            case Environment.PRODUCTION:

                createRolesIfRequired()
                createPageFrameworkIfRequired()
                createUsersIfRequired()
                createAccountTypesIfRequired()
                createAccountsIfRequired()
                createProductTypesAndProductsIfRequired()
                createSalesOrdersIfRequired()
        }
    }

    def destroy = {
    }

    void createRolesIfRequired() {
        if (Role.count() == 0) {
            println "Fresh Database. Creating roles."

            Role role

            role = new Role(authority: "ROLE_ADMIN");
            role.save();

            role = new Role(authority: "ROLE_USER")
            role.save();
        }
        else {
            println "Roles already exist."
        }
    }

    void createPageFrameworkIfRequired() {
        Module module
        Menu menu
        MenuItem menuItem

        if (Module.count() == 0) {
            println "Fresh Database. Creating PageFramework."

            module = new Module(name: "Main")
            module.save()
            menu = new Menu(name: "Main", module: module)
            menu.save()

            menuItem = new MenuItem(menu: menu, name: "Home", controller: "homepage", weight: 10);
            menuItem.save()
            menuItem = new MenuItem(menu: menu, name: "Campaign", controller: "campaign", weight: 20);
            menuItem.save()
            menuItem = new MenuItem(menu: menu, name: "Optimization", controller: "optimization", weight: 30);
            menuItem.save()
            menuItem = new MenuItem(menu: menu, name: "Reporting", controller: "reporting", weight: 40);
            menuItem.save()
            menuItem = new MenuItem(menu: menu, name: "Settings", controller: "settings", weight: 50);
            menuItem.save()
            menuItem = new MenuItem(menu: menu, name: "Administration", controller: "adminHome", weight: 60);
            menuItem.save()
        }
        else {
            println "PageFramework definitions already exist."
        }
    }

    void createClientsIfRequired() {
        /*
         if (clientService.findCount() == 0) {
         println "Creating clients"
         clientService.createClient("Wal-Mart", true, "Sam Walton", "Bentonville")
         clientService.createClient("McDonalds", true, "Ronald", "Oak Brook")
         clientService.createClient("Toys-R-Us", false, "Geoffrey", "Atlanta")
         }
         else {
         println "Clients already exist"
         }
         */
    }

    void createUsersIfRequired() {
        if (User.count() == 0) {
            println "Fresh Database. Creating basic users."

            Role roleAdministrator = Role.get(1)
            Role roleUser = Role.get(2)
            User user
            UserRole userRole
            Client client

            // jrisberg
            user = new User(username: "jrisberg", password: "123456", enabled: true)
            user.save()

            userRole = new UserRole(user: user, role: roleAdministrator)
            userRole.save()
            userRole = new UserRole(user: user, role: roleUser)
            userRole.save()

            // bob
            //client = clientService.findByName("Wal-Mart")
            user = new User(username: "bob", password: "123456", client: client, enabled: true)
            user.save()

            userRole = new UserRole(user: user, role: roleUser)
            userRole.save()

            // todd
            //client = clientService.findByName("McDonalds")
            user = new User(username: "todd", password: "123456", client: client, enabled: true)
            user.save()

            userRole = new UserRole(user: user, role: roleUser)
            userRole.save()
        } else {
            println "Users already exist."
        }
    }

    void createAccountTypesIfRequired() {
        if (AccountType.count() == 0) {
            println "Fresh Database. Creating account types."

            AccountType at

            at = new AccountType(name: "Group")
            at.save()
            at = new AccountType(name: "Building")
            at.save()
            at = new AccountType(name: "Component")
            at.save()
            at = new AccountType(name: "Administrative")
            at.save()
            at = new AccountType(name: "Manufacturing")
            at.save()
            at = new AccountType(name: "Data Center")
            at.save()
            at = new AccountType(name: "Recycling Center")
            at.save()
            at = new AccountType(name: "Recovery Device")
            at.save()
            at = new AccountType(name: "Customer")
            at.save()
        }
        else {
            println "Existing account type values, skipping creation."
        }
    }

    void createAccountsIfRequired() {
        if (Account.count() == 0) {
            println "Fresh Database. Creating accounts."

            AccountType accountType = AccountType.findByName("Customer")
            Account account

            account = new Account(name: "Account 1", type: accountType)
            account.save()
            account = new Account(name: "Account 2", type: accountType)
            account.save()
            account = new Account(name: "Account 3", type: accountType)
            account.save()
            account = new Account(name: "Account 4", type: accountType)
            account.save()
        }
        else {
            println "Existing account values, skipping creation."
        }
    }

    void createProductTypesAndProductsIfRequired() {
        if (ProductType.count() == 0) {
            println "Fresh Database. Creating ProductTypes and Products."
            ProductType productType
            Product product

            productType = new ProductType(name: "Book", description: "Something that you read")
            productType.save()

            productType = new ProductType(name: "Electronics", description: "Like a computer")
            productType.save()

            productType = new ProductType(name: "Clothing", description: "Wearable items")
            productType.save()

            product = new Product(partNo: "456", name: "Pants", productType: productType, price: 55.26)
            product.save()
            product = new Product(partNo: "457", name: "Dress", productType: productType, price: 120.86)
            product.save()
            product = new Product(partNo: "458", name: "Skirt", productType: productType, price: 74.34)
            product.save()
            product = new Product(partNo: "459", name: "Jeans", productType: productType, price: 44.29)
            product.save()
            product = new Product(partNo: "460", name: "Tie", productType: productType, price: 15.72)
            product.save()

            productType = new ProductType(name: "Toy", description: "Something you play with")
            productType.save()

            product = new Product(partNo: "501", name: "Buzz Lightyear", productType: productType, price: 34.99)
            product.save()
            product = new Product(partNo: "502", name: "Furby", productType: productType, price: 24.95)
            product.save()
        }
        else {
            println "ProductTypes and Products already exist."
        }
    }

    void createSalesOrdersIfRequired() {
        if (SalesOrder.count() == 0) {
            println "Fresh Database. Creating SalesOrders."

            SalesOrder order

            order = new SalesOrder()
            order.dateDue = new Date()
            order.datePlaced = new Date()
            order.value = 100
            order.save()

            order = new SalesOrder()
            order.dateDue = new Date()
            order.datePlaced = new Date()
            order.value = 200
            order.save()
        }
        else {
            println "SalesOrders already exist."
        }
    }
}

