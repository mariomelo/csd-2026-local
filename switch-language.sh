#!/bin/bash

# Script para mudar o idioma do projeto
# Troca as extensões dos arquivos de features e step definitions para ativar o idioma desejado

FEATURES_DIR="features"
STEP_DEFINITIONS_DIR="features/step_definitions"
AVAILABLE_LANGUAGES=("it" "pt_br" "en_us")

echo "🌍 Idiomas disponíveis:"
echo "1) Italiano (it)"
echo "2) Português Brasileiro (pt_br)"
echo "3) Inglês Americano (en_us)"
echo ""

read -p "Selecione o idioma (1-3): " choice

case $choice in
  1)
    TARGET_LANG="it"
    ;;
  2)
    TARGET_LANG="pt_br"
    ;;
  3)
    TARGET_LANG="en_us"
    ;;
  *)
    echo "❌ Opção inválida!"
    exit 1
    ;;
esac

echo ""
echo "🔄 Mudando idioma para: $TARGET_LANG"
echo ""

# Processar arquivos .feature
for feature_file in "$FEATURES_DIR"/*.feature; do
  if [ -f "$feature_file" ]; then
    # Extrai o nome base do arquivo (sem extensão)
    base_name=$(basename "$feature_file" .feature)

    # Renomeia o arquivo .feature atual para a extensão do idioma anterior
    # Primeiro, verifica qual idioma está ativo atualmente
    for lang in "${AVAILABLE_LANGUAGES[@]}"; do
      if [ ! -f "$FEATURES_DIR/$base_name.$lang" ]; then
        # Se não existe arquivo com essa extensão, é o idioma atual
        mv "$feature_file" "$FEATURES_DIR/$base_name.$lang"
        echo "📦 Salvando feature anterior: $base_name.$lang"
        break
      fi
    done
  fi
done

# Ativar features do idioma selecionado
for backup_file in "$FEATURES_DIR"/*."$TARGET_LANG"; do
  if [ -f "$backup_file" ]; then
    base_name=$(basename "$backup_file" ."$TARGET_LANG")
    mv "$backup_file" "$FEATURES_DIR/$base_name.feature"
    echo "✅ Ativando feature: $base_name.feature ($TARGET_LANG)"
  fi
done

# Processar arquivos de step definitions (.steps.js)
for steps_file in "$STEP_DEFINITIONS_DIR"/*.steps.js; do
  if [ -f "$steps_file" ]; then
    # Extrai o nome base do arquivo (sem .steps.js)
    base_name=$(basename "$steps_file" .steps.js)

    # Renomeia o arquivo .steps.js atual para a extensão do idioma anterior
    for lang in "${AVAILABLE_LANGUAGES[@]}"; do
      if [ ! -f "$STEP_DEFINITIONS_DIR/$base_name.steps.js.$lang" ]; then
        # Se não existe arquivo com essa extensão, é o idioma atual
        mv "$steps_file" "$STEP_DEFINITIONS_DIR/$base_name.steps.js.$lang"
        echo "📦 Salvando steps anterior: $base_name.steps.js.$lang"
        break
      fi
    done
  fi
done

# Ativar step definitions do idioma selecionado
for backup_file in "$STEP_DEFINITIONS_DIR"/*.steps.js."$TARGET_LANG"; do
  if [ -f "$backup_file" ]; then
    base_name=$(basename "$backup_file" .steps.js."$TARGET_LANG")
    mv "$backup_file" "$STEP_DEFINITIONS_DIR/$base_name.steps.js"
    echo "✅ Ativando steps: $base_name.steps.js ($TARGET_LANG)"
  fi
done

# Processar README
for readme_file in README.md; do
  if [ -f "$readme_file" ]; then
    for lang in "${AVAILABLE_LANGUAGES[@]}"; do
      if [ ! -f "README.$lang" ]; then
        mv "$readme_file" "README.$lang"
        echo "📦 Salvando README anterior: README.$lang"
        break
      fi
    done
  fi
done

# Ativar README do idioma selecionado
if [ -f "README.$TARGET_LANG" ]; then
  mv "README.$TARGET_LANG" README.md
  echo "✅ Ativando README: README.md ($TARGET_LANG)"
fi

echo ""
echo "✨ Idioma alterado com sucesso para: $TARGET_LANG"
echo ""
echo "💡 Dica: Execute 'npm run test:bdd' para rodar os testes no novo idioma"
