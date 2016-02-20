(function e(t, n, r) {
	function s(o, u) {
		if (!n[o]) {
			if (!t[o]) {
				var a = typeof require == "function" && require;
				if (!u && a)
					return a(o, !0);
				if (i)
					return i(o, !0);
				var f = new Error("Cannot find module '" + o + "'");
				throw f.code = "MODULE_NOT_FOUND",
				f
			}
			var l = n[o] = {
				exports : {}

			};
			t[o][0].call(l.exports, function (e) {
				var n = t[o][1][e];
				return s(n ? n : e)
			}, l, l.exports, e, t, n, r)
		}
		return n[o].exports
	}
	var i = typeof require == "function" && require;
	for (var o = 0; o < r.length; o++)
		s(r[o]);
	return s
})({
	1 : [function (require, module, exports) {
			function Auth() {
				console.log('Auth');
				PDK.login({
					scope : 'read_public, write_public'
				}, function (response) {

					if (!response || response.error) {
						console.log(resp.error || 'Error occurred');
					}

					console.log(response);
				});
			}

			function Logout() {
				console.log('Logout');
				PDK.logout();
			}

			function GetBoardsList() {
				console.log('GetBoardsList');

				PDK.me('boards', function (response) {
					if (!response || response.error) {
						console.log(resp.error || 'Error occurred');
					} else {

						console.log('Ok');
						console.log(response.data);
					}
				});
			}

			function GetBoard(board, isRequrvise, callback) {
				console.log('GetBoard');

				var pins = [];
				var params = {
					fields :
					'note,link,original_link,image,counts,board,created_at,media'
				};
				var uri = '/boards/' + board + '/pins/';

				PDK.request(uri, params, function (resp) {

					if (!resp || resp.error)
						console.log(resp.error || 'Error occurred');
					else {
						console.log(resp.data || 'Ok');
						pins = pins.concat(resp.data);

						if (isRequrvise && resp.hasNext) {
							resp.next();
						} else if (!isRequrvise || !resp.hasNext) {

							console.log('got ' + pins.length);
							if (callback)
								callback(resp.error, pins);
						}
					}
				});
			}

			function GetLatestPin(board, callback) {
				console.log('GetLatestPin');

				GetBoard(board, false, function (err, data) {

					var pin = (data && data.length > 0) ? data[0] : null;

					console.log(err || pin);

					if (callback)
						callback(err, pin);
				});
			}

			function MoveLatestPin(fromBoard, toBoard) {

				console.log('MoveLatestPin');

				GetLatestPin(fromBoard, function (err, pin) {

					console.log(err || pin);
					uri = '/v1/pins/' + pin.id + '/';
					params = {
						pin : pin.id,
						board : toBoard
					};

					console.log(uri);
					console.log(params);
					console.log(PDK.getSession().accessToken);

					PDK.request(uri, "PATCH", function (resp) {

						if (!resp || resp.error)
							console.log(resp.error || 'Error occurred');
						else
							console.log(resp.data || 'Ok');

					});
				});
			}

		}, {}

	]
}, {}, [1]);