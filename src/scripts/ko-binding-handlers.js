import ko from "knockout";

ko.bindingHandlers.customSelect = {
  init(element, valueAccessor) {
    const params = valueAccessor();
    const value = params.value;

    if (ko.isWriteableObservable(value)) {
      value.subscribe(v => {
        element.value = ko.unwrap(v);
      });
    }

    element.addEventListener("change", () => {
      if (ko.isWriteableObservable(value)) {
        value(element.value);
      }
    });

    return { controlsDescendantBindings: true };
  },

  update(element, valueAccessor) {
    const params = valueAccessor();

    const options = ko.unwrap(params.options) || [];
    const value = params.value;
    const textProp = params.text;
    const keyProp = params.key;

    element.optionsText = textProp;
    element.optionsValue = keyProp;
    element.options = options;

    if (ko.isWriteableObservable(value)) {
      element.value = ko.unwrap(value());
    }
  }
};
