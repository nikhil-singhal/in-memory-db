// database
// -name
// -name-table map


// table
// - name
// - name column map 
// - rows list 


// - addData
// - addIndex

// row
// - id
// - column - object 


// column
// - name
// - type



class Database{

	constructor(name){
		this.name = name
		this.tables = {}
	}

	addTable(table){
		this.tables[table.name] = table
	}

}


class Table{

	constructor(name, columnMap){
		this.name = name;
		this.rows = [];
		this.columns = columnMap
		this.indexMap = {}
	}

	getColumn(name){
		return this.columns[name]
	}

	addRow(row){
		this.rows.push(row)
	}

	showData(columnName, columnValue){
		console.log(this.indexMap)
		if(this.indexMap[columnName]){
			showRows([this.indexMap[columnName][columnValue]])
			return
		}

		this.rows.forEach(row =>{
			console.log(`${row.id}`)
			if(!columnName || row.columnData[columnName].data == columnValue){
				for(let key in row.columnData){
					console.log(`${row.columnData[key].column.name} : ${row.columnData[key].data} ` )
				}	
			}

		})

		function showRows(rows){
			rows.forEach(row =>{
				console.log(`${row.id}`)
				for(let key in row.columnData){
					console.log(`${row.columnData[key].column.name} :: ${row.columnData[key].data} ` )
				}	
			})
		}
	}

	addIndex(columnName){
		var columnMap = {}
		this.rows.forEach(row =>{
			columnMap[row.columnData[columnName].data] = row
		})
		this.indexMap[columnName] = columnMap
		console.log(this.indexMap)
	}
}


class Row{
	constructor(columnData){
		this.id = 1;
		this.columnData = columnData
	}

}



class Column{
	constructor(name, type){
		this.name = name;
		this.type = type
	}
}



let db = new Database('crypto')


let currencyName = new Column('name', 'String')
let currValue = new Column('currValue', 'Integer')
let creationTime = new Column('creationTime', 'String')

let columnMap = {}
columnMap[currencyName.name] = currencyName 
columnMap[currValue.name] = currValue 
columnMap[creationTime.name] = creationTime 

let currency = new Table('currency', columnMap)



let columnData = {}

columnData['name'] = {
	column:	currency.getColumn('name'),
	data : 'bitcoin'
}

columnData['currValue'] = {
	column:	currency.getColumn('currValue'),
	data : 70000
}
columnData['creationTime'] = {
	column:	currency.getColumn('creationTime'),
	data : '2008-09-02'
}

let firstRow = new Row(columnData)

currency.addRow(firstRow)

db.addTable(currency)

db.tables['currency'].showData()

// db.tables['currency'].showData('name', 'bitcoin')
// db.tables['currency'].showData('name', 'etherium')


db.tables['currency'].addIndex('name')

db.tables['currency'].showData('name', 'bitcoin')
