exports.migrate = function(persistence) {

  persistence.migrations.init(function() {
  
    persistence.defineMigration(1, {
      up: function() {
        this.createTable('Task', function(t){
          t.text('name');
          t.text('description');
          t.boolean('done');
        });
      },
      down: function() {
        this.dropTable('Task');
      }
    });

    persistence.migrate();
  });

}
