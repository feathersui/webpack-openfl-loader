import com.example.MyModule;
import genes.Genes;
import openfl.display.Sprite;
import openfl.events.MouseEvent;
import openfl.text.TextField;
import openfl.text.TextFormat;

class Main extends Sprite {
	private var button:Sprite;

	public function new() {
		super();

		button = new Sprite();
		button.buttonMode = true;
		button.mouseChildren = false;
		button.graphics.beginFill(0xff0000);
		button.graphics.drawRoundRect(0.0, 0.0, 150.0, 50.0, 10.0);
		button.graphics.endFill();
		var buttonText = new TextField();
		buttonText.defaultTextFormat = new TextFormat("_sans", 20, 0xffffff);
		buttonText.autoSize = LEFT;
		buttonText.text = "Click Me";
		buttonText.x = (button.width - buttonText.width) / 2.0;
		buttonText.y = (button.height - buttonText.height) / 2.0;
		button.x = 10.0;
		button.y = 10.0;
		button.addChild(buttonText);
		addChild(button);

		button.addEventListener(MouseEvent.CLICK, onButtonClick);
	}

	private function onButtonClick(event:MouseEvent):Void {
		button.mouseEnabled = false;
		button.alpha = 0.5;

		// load the module on demand
		Genes.dynamicImport(MyModule -> new MyModule()).then((module) -> {
			module.x = 10.0;
			module.y = 70.0;
			addChild(module);
		});
	}
}
