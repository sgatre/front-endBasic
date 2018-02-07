var canvas = $("#myCanvas");
				var context = canvas.get(0).getContext("2d");
				
				var text = "Hello, World!"; // String of text to display
				context.font = "italic 30px serif";// Change the size and font
				context.fillText(text, 40, 40); // Draw the text