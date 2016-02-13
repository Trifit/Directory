(function($){
  //-------------  
  // Model:
  //-------------
  
  var DirectoryItem = Backbone.Model.extend();

  
  //-------------
  // Collection:
  //-------------

  var Directory = Backbone.Collection.extend({    
    model: DirectoryItem,
    url: 'JSON/directory.json',


  });
  
  //-------------
  // List View:
  //-------------

  var DirectoryListView = Backbone.View.extend({

    el: $("#directoryView"),

    elItem: $("#itemView"),

    template: _.template($('#item-list-template').html(), {Business: Directory.models}),
    
    events: {
        "click li": "itemClicked"
    },

    initialize: function() {
      this.render();      
    },

    render: function () {
      var that = this;

      this.collection = new Directory();

      this.collection.fetch({
        success: function(col){          
          
          col.each(function(model){
            //we get the data that we need from the collection            
            var data = {
              id: model.get('id'), 
              Business: model.get('Business'),
              Field: model.get('Field')
            };
            //we pass the data to the template
            that.$el.append(that.template(data));            
          });          

          that.$el.toggleClass('view');

          console.log('Model finished loading!'); 
        }
      });      
    },
      
    itemClicked: function(e){      
      e.preventDefault();
      //we get the id of the clicked item throught his data propierty from the html 
      var id = $(e.currentTarget).data('id');
      //we load the detail view of the selected model
      var directoryItemView = new DirectoryItemView({ model: this.getModel(id) });      
    },

    getModel: function(modelId){
      return this.collection.get(modelId);
    }
  });
  
  var directoryListView = new DirectoryListView();

  //-------------
  // Item detail View:
  //-------------

  var DirectoryItemView = Backbone.View.extend({
    el: $("#itemView"),

    template: _.template($('#item-template').html()),

    initialize: function(){
      this.render();      
    },

    render: function () {      
      var data =  this.getModel().toJSON();      
      this.$el.toggleClass('view');
      this.$el.html(this.template(data));
    },

    getModel: function () {
      return this.model;
    }    
  });

  var AddItemView = Backbone.View.extend({
    
    el: $('#addView'),

    template: _.template($('#add-item-template').html()),

    events: {
        "click a": "addItem"
    },
    
    addItem: function(e){
      e.preventDefault();
      this.render();      
    },

    render: function () {
      var html = this.template();

      this.$el.append(html);
      /*if(this.$el.children().eq(1).hadClass('is-hidden')){
        this.$el.children().eq(1).removeClass('is-hidden');  
      }else{
        this.$el.children().eq(1).remove();
      }*/
    },

    

  });

  var addItemView = new AddItemView({});
  
})(jQuery);