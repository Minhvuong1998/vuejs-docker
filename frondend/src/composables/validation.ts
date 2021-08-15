import useVuelidate, { ValidationRule } from "@vuelidate/core";
import { helpers } from "@vuelidate/validators";
import includes from "lodash/includes";
import keys from "lodash/keys";
import { onBeforeRouteLeave } from "vue-router";

export interface ValidationArgs {
  [K: string]: ValidationRule | ValidationArgs;
}

type ExcludeFieldLabel<VArgs> = {
  [K in keyof VArgs]:
    | (VArgs[K] extends ValidationRule
        ? ValidationRule
        : Omit<VArgs[K], "fieldLabel">)
    | ExcludeFieldLabel<VArgs>;
};

export const messageValidate = {
  required: ($0: string) => `${$0} is required`,
  maxlength: ($0: string, $1: number) =>
    `${$0} is too long. Please input maximums of ${$1} characters.`,
  uploadFileType: ($0: string, $1: string) => `${$0} is not in ${$1} format.`,
};

export interface ValidationArgsWithLabel {
  [K: string]: ValidationRule | ValidationArgsWithLabel | string;
}

const getValidator = <VArgs extends ValidationArgsWithLabel>(input: VArgs) => {
  const validator = <ExcludeFieldLabel<VArgs>>{};
  for (const field of keys(input)) {
    const rules = <ValidationArgs>input[field];
    const keysOfRules = keys(rules);
    let label = "";
    if (includes(keysOfRules, "fieldLabel")) {
      const fieldValidator = <ValidationArgs>{};
      for (const ruleName of keys(rules)) {
        if (ruleName === "fieldLabel") {
          label = (<unknown>rules[ruleName]) as string;
          continue;
        }
        if (ruleName === "$each") {
          fieldValidator["$each"] = getValidator(
            <ValidationArgs>rules["$each"]!
          );
        } else {
          if (ruleName in messageValidate) {
            fieldValidator[ruleName] = helpers.withMessage(
              messageValidate[<keyof typeof messageValidate>ruleName](
                label,
                "asd" as never
                // values((rules[ruleName]).$params)[0],
              ),
              <ValidationRule>rules[ruleName]
            );
          } else {
            fieldValidator[ruleName] = rules[ruleName];
          }
        }
      }
      validator[<keyof ExcludeFieldLabel<VArgs>>field] = <
        ExcludeFieldLabel<VArgs>
      >fieldValidator;
    } else {
      validator[<keyof ExcludeFieldLabel<VArgs>>field] = <
        ExcludeFieldLabel<VArgs>
      >getValidator(rules);
    }
  }

  return validator;
};

export const scrollToError = () => {
  setTimeout(() => {
    const errElement = document.getElementsByClassName('border-danger');
    if (errElement[0] !== undefined) {
      errElement[0].scrollIntoView({ block: 'center', inline: 'center' });
    }
  }, 100);
};

export const useValidation = <VArgs extends ValidationArgsWithLabel, T>(
  rules: VArgs,
  form: T
) => {
  const validator = getValidator(rules);
  const v = useVuelidate(validator, <any>form);
  window.onbeforeunload = () => {
    if (v.value.$anyDirty) {
      return 'Is it okay if the information being edited is discarded?';
    }
  };
  onBeforeRouteLeave(async () => {
    // if (v.value.$anyDirty) {
    //   const result = await confirm(
    //     '編集中の情報が破棄されますがよろしいですか？',
    //   );

    //   if (!result.isConfirmed) return false;
    // }

    window.onbeforeunload = null;
    return true;
  });
  const safeLeave = () => {
    v.value.$reset();
    window.onbeforeunload = null;
  };
  return { v, safeLeave, formModel: form, scrollToError };
};
