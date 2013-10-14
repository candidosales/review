var App = Ember.Application.create({
  LOG_TRANSITIONS: true
});
App.ApplicationAdapter = DS.FixtureAdapter.extend();

App.PageView = Ember.View.extend({
  didInsertElement: function() {
    $(".twentytwenty-container").twentytwenty({default_offset_pct: 0.7}); 
    $(window).on("resize.twentytwenty", function(e) {
        adjustSlider(sliderPct);
    });
    
    $('.accordion-menu li').click(function(){
		$('.accordion-menu li').each(function(){
			$(this).closest('li').removeClass('active');
		});
			$(this).closest('li').addClass('active');
	});

    console.log('twenty ember'); 
  }
});



App.Router.map(function() {
  this.resource('pages',function(){
  	this.resource('page',{path: '/:page_id'});
  });

});

App.IndexRoute = Ember.Route.extend({
  page: null,
  redirect: function(){
  	page = this.store.find('page', 1);
	this.transitionTo('pages');
  }
});

App.PageController = Ember.ObjectController.extend({
	isResult: true,
	isFullScreen:false,
	zoom: 0,
	actions: {
		openModal: function() {
			$('#changelog').foundation('reveal', 'open');
		},

		closeModal: function() {
			$('#changelog').foundation('reveal', 'close');
		},

		fullScreen: function() {
		    	this.set('isFullScreen', true);
		    	BigScreen.toggle();
		},

		exitFullScreen: function() {
			this.set('isFullScreen', false);
			BigScreen.exit();
		}
	}

});

App.PagesRoute = Ember.Route.extend({
	model: function(params) {
		return this.store.find('page',params.page_id);
	}
});

App.Page = DS.Model.extend({
	title: DS.attr('string'),
	icon: DS.attr('string'),
	son: DS.attr('boolean'),
	pathVision: DS.attr('string'),
	pathResult: DS.attr('string'),
	children: DS.hasMany('page')
});

App.Page.FIXTURES = [{
	id: 1,
	title: "Painel",
	icon: "",
	pathVision: "img/painel-v.png",
	pathResult: "img/painel-r.jpg"
},{
	id: 2,
	title: "Mensagens",
	icon: "",
	pathVision: "img/mensagens-v.png",
	pathResult: "img/mensagens-r.jpg",
	children:[3]
},{
	id: 3,
	title: "Mensagem",
	icon: "",
	son: true,
	pathVision: "img/mensagem-v.png",
	pathResult: "img/mensagem-r.jpg"
},{
	id: 4,
	title: "Solicitações",
	icon: "",
	pathVision: "img/solicitacoes-v.png",
	pathResult: "img/solicitacoes-r.jpg"
},{
	id: 5,
	title: "Arquivos",
	icon: "",
	pathVision: "img/arquivos-v.png",
	pathResult: "img/arquivos-r.jpg"
}];
