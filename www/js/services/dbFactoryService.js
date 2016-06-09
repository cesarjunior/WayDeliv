var dbFactory = angular.module('smartServices.dbFactory', []);

dbFactory.constant('DB_CONFIG', {
    name: 'smartBase',
    version: '1.0',
    description: 'banco de dados mkOffice',
    size: 200000,
    tables: [
        {
            name: 'clientes',
            columns: [
                {name: 'id', type: 'INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT'},
                {name: 'nome', type: 'TEXT NOT NULL'},
                {name: 'telefone', type: 'TEXT'},
                {name: 'email', type: 'TEXT'},
                {name: 'data_nascimento', type: 'TEXT'},
                {name: 'observacao', type: 'TEXT'},
                {name: 'editado', type: 'INTEGER'},
                {name: 'excluido', type: 'INTEGER'}
            ]
        },
        {
            name: 'produtos',
            columns: [
                {name: 'id', type: 'INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT'},
                {name: 'produto', type: 'TEXT NOT NULL'},
                {name: 'preco_venda', type: 'TEXT'},
                {name: 'duracao', type: 'INTEGER'},
                {name: 'estoque', type: 'INTEGER'},
                {name: 'observacao', type: 'TEXT'},
                {name: 'editado', type: 'INTEGER'},
                {name: 'excluido', type: 'INTEGER'}
            ]
        },
        {
            name: 'vendas',
            columns: [
                {name: 'id', type: 'INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT'},
                {name: 'fk_id_cliente', type: 'INTEGER'},
                {name: 'total_venda', type: 'TEXT'},
                {name: 'editado', type: 'INTEGER'},
                {name: 'excluido', type: 'INTEGER'}
            ]
        },
        {
            name: 'vendas_itens',
            columns: [
                {name: 'id', type: 'INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT'},
                {name: 'fk_id_venda', type: 'INTEGER'},
                {name: 'fk_id_produto', type: 'INTEGER'},
                {name: 'quantidade', type: 'INTEGER'},
                {name: 'valor_item', type: 'TEXT'},
                {name: 'editado', type: 'INTEGER'},
                {name: 'excluido', type: 'INTEGER'}
            ]
        }
    ]
});

dbFactory.factory('dbFactory', function ($q, DB_CONFIG) {
    var self = this;
    self.db = null;
    self.table = '';

    self.init = function () {
        // Use self.db = window.sqlitePlugin.openDatabase({name: DB_CONFIG.name}); in production
        //self.db = window.openDatabase(DB_CONFIG.name, '1.0', 'database', -1);
        self.db = window.openDatabase(DB_CONFIG.name, DB_CONFIG.version, DB_CONFIG.description, DB_CONFIG.size);

        angular.forEach(DB_CONFIG.tables, function (table) {
            var columns = [];

            angular.forEach(table.columns, function (column) {
                columns.push(column.name + ' ' + column.type);
            });

            var query = 'CREATE TABLE IF NOT EXISTS ' + table.name + ' (' + columns.join(',') + ')';
            self.query(query);
        });
        //self.query('DROP TABLE produtos');
    };

    self.setTable = function (table) {
        self.table = table;
        return self;
    };

    self.query = function (query, bindings) {
        bindings = typeof bindings !== 'undefined' ? bindings : [];
        var deferred = $q.defer();

        //console.log(query);
        self.db.transaction(function (transaction) {
            transaction.executeSql(query, bindings, function (transaction, result) {
                deferred.resolve(result);
            }, function (transaction, error) {
                deferred.reject(error);
            });
        });

        return deferred.promise;
    };

    self.fetch = function (params) {
        params = typeof params === 'undefined' ? {} : params;
        var sql = '';
        if (typeof params == 'string') {
            sql = params;
        } else {
            sql = 'SELECT ';
            if (typeof params.columns == 'string') {
                sql = sql + params.cloumns;
            } else if (typeof params.columns == 'object') {
                sql = sql + params.columns.toString();
            } else {
                sql = sql + '*';
            }

            if (sql.length == 0) {
                throw 'SQL montada de forma errada dendo do getRegisters';
            }

            sql = sql + ' FROM ' + self.table;
            if (typeof params.where == 'string') {
                sql = sql + ' WHERE ' + params.where + " AND excluido = 0";
            } else if (typeof params.where == 'array') {
                sql = sql + ' WHERE ';
                angular.forEach(params.where, function (val, index) {
                    sql = sql + val + ' AND ';
                });
                sql = sql + 'excluido = 0';
            } else {
                sql = sql + ' WHERE excluido = 0';
            }

            if (typeof params.order == 'string') {
                sql = sql + ' ORDER BY ' + params.order;
            }
        }
        //console.log(sql);
        return self.query(sql, []).then(function (result) {
            var output = [];
            for (var i = 0; i < result.rows.length; i++) {
                output.push(result.rows.item(i));
            }

            return output;
        });

    };

    self.find = function (id) {
        var sql = "SELECT * FROM " + self.table + " WHERE id = ?";
        return self.query(sql, [id]).then(function (result) {
            return result.rows.item(0);
        });
    };

    self.save = function (data) {
        data.editado = 1;
        data.excluido = (typeof data.excluido == 'undefined') ? 0 : data.excluido;
        var columns = [];
        var values = [];
        var valuesBindings = [];
        var insert = true;
        var sql, id;
        angular.forEach(data, function (ve, ix) {
            if (ix == 'id') {
                if (ve != '' && typeof ve != 'undefined') {
                    insert = false;
                    id = ve;
                }
            } else {
                columns.push(ix);
                values.push(ve);
                valuesBindings.push('?');
            }
        });

        if (insert) {
            sql = "INSERT INTO " + self.table + " (" + columns.join(',') + ") VALUES (" + valuesBindings.toString() + ")";
            return self.query(sql, values).then(function (result) {
                return result.insertId;
            }, function (error) {
                console.log(error);
            });
        } else {
            sql = "UPDATE " + self.table + " SET " + columns.join(' = ?,') + " = ? WHERE id = " + id;
            return self.query(sql, values).then(function (result) {
                return id;
            }, function (error) {
                console.log(error);
            });
        }
    };

    self.delete = function (id) {
        var sql = "UPDATE " + self.table + " SET excluido = 1, editado = 1 WHERE id = ?";
        return self.query(sql, [id]).then(function (result) {
            return;
        });
    };

    return self;
});