var App = Ember.Application.create({
  LOG_TRANSITIONS: true
});
App.ApplicationAdapter = DS.FixtureAdapter.extend();

App.PageView = Ember.View.extend({
  didInsertElement: function() {
    $(".twentytwenty-container").twentytwenty({default_offset_pct: 0.7}); 
    $(window).trigger("resize.twentytwenty");
    
    $('.accordion-menu li').click(function(){
		$('.accordion-menu li').each(function(){
			$(this).closest('li').removeClass('active');
		});
			$(this).closest('li').addClass('active');
	});
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
	pathVision: "img/painel-p.jpg",
	pathResult: "img/painel.jpg"
},{
	id: 2,
	title: "Perfil",
	icon: "",
	pathVision: "img/perfil-p.jpg",
	pathResult: "img/perfil.jpg"
},{
	id: 3,
	title: "Relatórios",
	icon: "",
	pathVision: "img/relatorio-p.jpg",
	pathResult: "img/relatorio.jpg"
},{
	id: 4,
	title: "Meus anúncios",
	icon: "",
	pathVision: "img/anuncio-p.jpg",
	pathResult: "img/anuncio.jpg"
},{
	id: 5,
	title: "Cadastrar anúncio",
	icon: "",
	pathVision: "img/tipo-anuncio-p.jpg",
	pathResult: "img/tipo-anuncio.jpg",
	children:[6,7,8,9]
},{
	id: 6,
	title: "Escolha as categorias",
	icon: "",
	pathVision: "img/categoria-p.jpg",
	pathResult: "img/categoria.jpg",
	son: true
},{
	id: 7,
	title: "Descreva o anúncio",
	icon: "",
	pathVision: "img/descreva-p.jpg",
	pathResult: "img/descreva.jpg",
	son: true
},{
	id: 8,
	title: "Confirme seu anúncio",
	icon: "",
	pathVision: "img/confirme-p.jpg",
	pathResult: "img/confirme.jpg",
	son: true
},{
	id: 9,
	title: "Pagamento",
	icon: "",
	pathVision: "img/pagamento-p.jpg",
	pathResult: "img/pagamento.jpg",
	son: true
},
,{
	id: 10,
	title: "Passo a Passo",
	icon: "",
	pathVision: "img/passo-p.jpg",
	pathResult: "img/passo.jpg"
}];
